import { useCallback, useEffect, useState, useMemo, useRef } from "react";
import { useStore } from "zustand";
import { useMonsterStore } from "@/store/useMonsterStore";
import { monsterForm } from "./schema";

export const useMain = () => {
    const [step, setStep] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isFighting, setIsFighting] = useState(false);
    const [winner, setWinner] = useState<string | null>(null);

    // Refs para intervalos
    const fightIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const monsters = useStore(useMonsterStore, (state) => state.monsters);
    const setMonsters = useStore(useMonsterStore, (state) => state.setMonsters);
    const addMonster = useStore(useMonsterStore, (state) => state.addMonster);

    // Memoiza os monsters processados para evitar recálculos
    const processedMonsters = useMemo(() => {
        return monsters.map(monster => ({
            ...monster,
            health: Number(monster.health) || 0,
            attack: Number(monster.attack) || 0,
            speed: Number(monster.speed) || 0,
            damage: Number(monster.damage) || Number(monster.attack) || 0
        }));
    }, [monsters]);

    // Memoiza o estado da luta
    const fightState = useMemo(() => {
        const [first, second] = processedMonsters;
        if (!first || !second) return null;

        return {
            hasDefeatedMonster: first.health <= 0 || second.health <= 0,
            winner: first.health <= 0 ? second : (second.health <= 0 ? first : null),
            canFight: first.health > 0 && second.health > 0
        };
    }, [processedMonsters]);

    const handleUpdateStats = useCallback((index: number, updates: Partial<monsterForm>) => {
        setMonsters(monsters.map((monster, i) =>
            i === index ? { ...monster, ...updates } : monster
        ));
    }, [monsters, setMonsters]);

    const executeFight = useCallback(() => {
        const [firstMonster, secondMonster] = processedMonsters;

        if (!firstMonster || !secondMonster || firstMonster.health <= 0 || secondMonster.health <= 0) {
            return;
        }

        let attackerIndex: number;
        let defenderIndex: number;
        let damage: number;

        // Determina quem ataca baseado na velocidade/ataque
        if (firstMonster.speed === secondMonster.speed) {
            if (firstMonster.attack > secondMonster.attack) {
                attackerIndex = 0;
                defenderIndex = 1;
                damage = firstMonster.damage;
            } else {
                attackerIndex = 1;
                defenderIndex = 0;
                damage = secondMonster.damage;
            }
        } else if (firstMonster.speed > secondMonster.speed) {
            attackerIndex = 0;
            defenderIndex = 1;
            damage = firstMonster.damage;
        } else {
            attackerIndex = 1;
            defenderIndex = 0;
            damage = secondMonster.damage;
        }

        const defender = processedMonsters[defenderIndex];
        const newHealth = Math.max(0, defender.health - damage);

        handleUpdateStats(defenderIndex, { health: newHealth });
    }, [processedMonsters, handleUpdateStats]);

    // Limpa intervalos de forma segura
    const clearAllIntervals = useCallback(() => {
        if (fightIntervalRef.current) {
            clearInterval(fightIntervalRef.current);
            fightIntervalRef.current = null;
        }
        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
            progressIntervalRef.current = null;
        }
    }, []);

    // Controla a luta
    useEffect(() => {
        if (step !== 2 || !isFighting) {
            if (fightIntervalRef.current) {
                clearInterval(fightIntervalRef.current);
                fightIntervalRef.current = null;
            }
            return;
        }

        if (!fightState?.canFight) {
            if (fightState?.winner) {
                setWinner(fightState.winner.name);
                setIsFighting(false);
            }
            return;
        }

        fightIntervalRef.current = setInterval(executeFight, 1000);

        return () => {
            if (fightIntervalRef.current) {
                clearInterval(fightIntervalRef.current);
                fightIntervalRef.current = null;
            }
        };
    }, [step, isFighting, fightState, executeFight]);

    // Controla o progresso
    useEffect(() => {
        if (progress >= 100) {
            setStep(2);
            setIsFighting(true);
            return;
        }

        if (step !== 1) {
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
                progressIntervalRef.current = null;
            }
            return;
        }

        progressIntervalRef.current = setInterval(() => {
            setProgress(prev => Math.min(100, prev + 1));
        }, 50);

        return () => {
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
                progressIntervalRef.current = null;
            }
        };
    }, [step, progress]);

    // Verifica fim da luta usando o estado memoizado
    useEffect(() => {
        if (step === 2 && isFighting && fightState?.hasDefeatedMonster && fightState?.winner) {
            setWinner(fightState.winner.name);
            setIsFighting(false);
        }
    }, [step, isFighting, fightState]);

    const handleAddMonter = useCallback((monster: monsterForm) => {
        const safeMonster: monsterForm = {
            ...monster,
            health: Number(monster.health) || 100,
            attack: Number(monster.attack) || 10,
            speed: Number(monster.speed) || 5,
            damage: Number(monster.damage) || Number(monster.attack) || 10
        };
        addMonster(safeMonster);
    }, [addMonster]);

    const handleStart = useCallback(() => {
        if (monsters.length < 2) {
            console.warn('É necessário pelo menos 2 monsters para iniciar a luta');
            return;
        }

        clearAllIntervals();
        setStep(1);
        setProgress(0);
        setIsFighting(false);
        setWinner(null);
    }, [monsters.length, clearAllIntervals]);

    const handleRestart = useCallback(() => {
        clearAllIntervals();
        setStep(0);
        setProgress(0);
        setIsFighting(false);
        setWinner(null);
        setMonsters([]); // Limpa os monstros
    }, [clearAllIntervals, setMonsters]);

    // Cleanup na desmontagem
    useEffect(() => {
        return () => clearAllIntervals();
    }, [clearAllIntervals]);

    return {
        step,
        setStep,
        progress,
        setProgress,
        isFighting,
        setIsFighting,
        winner,
        setWinner,
        monsters: processedMonsters,
        handleAddMonter,
        handleStart,
        handleRestart,
        handleUpdateStats
    }
}