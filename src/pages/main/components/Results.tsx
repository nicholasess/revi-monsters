import Monster from "@/components/Monster"
import { cn } from "@/lib/utils";
import { useMonsterStore } from "@/store/useMonsterStore";
import { useStore } from "zustand";


export const Results = ({ handleRestart, isFighting, winner }) => {
    const monsters = useStore(useMonsterStore, (state) => state.monsters);

    return <div className="w-[700px] mx-auto">
        <div className="mb-5 text-center">
            {isFighting && <h1 className="text-white text-2xl">LUTA EM ANDAMENTO!</h1>}
            {winner && (
                <div>
                    <h1 className="text-white text-2xl">🏆 VENCEDOR: {winner}! 🏆</h1>
                    <button
                        onClick={handleRestart}
                        className="mt-2 px-5 py-2 text-base bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
                    >
                        Reiniciar Batalha
                    </button>
                </div>
            )}
        </div>

        <div className={cn("flex justify-around items-center", {
            "gap-4": !winner
        })}>
            {monsters.filter((m) => winner ? m.name === winner : true).map((monster, index) => (
                <Monster
                    name={monster.name}
                    image={monster.image}
                    key={index}
                    health={monster.health}
                    attack={monster.attack}
                    defense={monster.defense}
                    speed={monster.speed}
                />
            ))}
        </div>
    </div>
}