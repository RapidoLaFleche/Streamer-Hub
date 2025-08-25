import { useEffect, useState } from "react";

export default function Lounge() {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5174/api/mkworld/leaderboard")
            .then((res) => res.json())
            .then((data) => setPlayers(data.players || []))
            .catch((err) => console.error("Erreur fetch leaderboard:", err));
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">
                <p className="text-yellow-400">Rayzopp</p> est actuellement classé 74ème Mondial avec 8892 MMR !
            </h1>
            <table className="w-full border-collapse border border-gray-500">
                <thead>
                    <tr className="bg-gray-800 text-yellow-400">
                        <th className="p-2">Position</th>
                        <th className="p-2">Nom</th>
                        <th className="p-2">MMR</th>
                        <th className="p-2">Pays</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map((p) => (
                        <tr key={p.overallRank} className="hover:bg-gray-700">
                            <td className="p-2">{p.overallRank}</td>
                            <td className="p-2">{p.name}</td>
                            <td className="p-2">{p.mmr}</td>
                            <td className="p-2">
                                {p.countryCode ? (
                                    <img
                                        src={`https://flagcdn.com/24x18/${p.countryCode.toLowerCase()}.png`}
                                        alt={p.countryCode}
                                        className="inline-block"
                                    />
                                ) : (
                                    "-"
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
