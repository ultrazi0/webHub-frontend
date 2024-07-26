import { Link, useLoaderData } from "react-router-dom";


export async function loader() {
    const robots = await fetch("/api/getAllRobots").then(response => response.json());
    return { robots };
}

export default function Root() {
    const { robots } = useLoaderData();

    return (
        <>
            <h1>Home</h1>
            <Link to={"control-panel"}>If you want to play</Link>
            <ul>
                {robots.map((robot) => (
                    <li key={robot.id}>
                        <Link to={"control-panel/" + robot.name}>{robot.name}</Link>
                    </li>
                ))}
            </ul>
        </>
    );
}
