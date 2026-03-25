"""
LangGraph state graph for parallel agent execution.
"""
import asyncio
from typing import TypedDict, Annotated, AsyncIterator
from dataclasses import dataclass

from agents import (
    AGENT_CONFIGS,
    stream_agent_response,
)


@dataclass
class StreamEvent:
    """Represents a streaming event from an agent."""
    agent: str
    chunk: str
    is_done: bool = False
    is_error: bool = False


class DissectState(TypedDict):
    """State for the dissect graph."""
    idea: str
    technical_critique: str
    market_critique: str
    ethics_critique: str
    ux_critique: str
    synthesis: str


async def run_parallel_critics(idea: str) -> AsyncIterator[StreamEvent]:
    """
    Run all four critic agents in parallel, yielding stream events as they arrive.
    """
    critics = [
        ("technical_skeptic", AGENT_CONFIGS["technical_skeptic"]["prompt"]),
        ("market_critic", AGENT_CONFIGS["market_critic"]["prompt"]),
        ("ethics_advocate", AGENT_CONFIGS["ethics_advocate"]["prompt"]),
        ("lazy_user", AGENT_CONFIGS["lazy_user"]["prompt"]),
    ]

    critiques = {agent_id: [] for agent_id, _ in critics}
    completed = set()

    async def stream_critic(agent_id: str, prompt: str, queue: asyncio.Queue):
        """Stream a single critic's response to the queue."""
        try:
            async for chunk in stream_agent_response(prompt, idea):
                await queue.put(StreamEvent(agent=agent_id, chunk=chunk))
                critiques[agent_id].append(chunk)
            await queue.put(StreamEvent(agent=agent_id, chunk="", is_done=True))
        except Exception as e:
            error_msg = f"Error: {str(e)}"
            await queue.put(StreamEvent(agent=agent_id, chunk=error_msg, is_error=True))
            await queue.put(StreamEvent(agent=agent_id, chunk="", is_done=True))

    queue = asyncio.Queue()
    tasks = [
        asyncio.create_task(stream_critic(agent_id, prompt, queue))
        for agent_id, prompt in critics
    ]

    while len(completed) < len(critics):
        event = await queue.get()
        yield event
        if event.is_done:
            completed.add(event.agent)

    await asyncio.gather(*tasks, return_exceptions=True)

    all_critiques = {
        agent_id: "".join(chunks) for agent_id, chunks in critiques.items()
    }
    yield StreamEvent(agent="critiques_complete", chunk="", is_done=True)

    synthesis_context = f"""
ORIGINAL IDEA:
{idea}

---

TECHNICAL SKEPTIC CRITIQUE:
{all_critiques.get('technical_skeptic', 'No critique available')}

---

MARKET CRITIC CRITIQUE:
{all_critiques.get('market_critic', 'No critique available')}

---

ETHICS DEVIL'S ADVOCATE CRITIQUE:
{all_critiques.get('ethics_advocate', 'No critique available')}

---

LAZY USER TESTER CRITIQUE:
{all_critiques.get('lazy_user', 'No critique available')}
"""

    try:
        async for chunk in stream_agent_response(
            AGENT_CONFIGS["synthesis"]["prompt"],
            synthesis_context
        ):
            yield StreamEvent(agent="synthesis", chunk=chunk)
        yield StreamEvent(agent="synthesis", chunk="", is_done=True)
    except Exception as e:
        error_msg = f"Error: {str(e)}"
        yield StreamEvent(agent="synthesis", chunk=error_msg, is_error=True)
        yield StreamEvent(agent="synthesis", chunk="", is_done=True)

    yield StreamEvent(agent="done", chunk="", is_done=True)


async def run_dissect_pipeline(idea: str) -> AsyncIterator[StreamEvent]:
    """
    Run the complete dissect pipeline: parallel critics then synthesis.
    """
    async for event in run_parallel_critics(idea):
        yield event
