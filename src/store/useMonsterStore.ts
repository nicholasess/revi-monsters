import { monsterForm } from '@/pages/main/schema';
import { create } from 'zustand';

type MonsterStore = {
    monsters: monsterForm[];
    addMonster: (monster: monsterForm) => void;
    removeMonster: (id: string) => void;
    updateMonster: (id: string, data: Partial<monsterForm>) => void;
    setMonsters: (monsters: monsterForm[]) => void;
};

export const useMonsterStore = create<MonsterStore>((set) => ({
    monsters: [
    ],
    addMonster: (monster: monsterForm): void =>
        set((state) => ({
            monsters: [...state.monsters, {
                ...monster,
                id: crypto.randomUUID(), // Ensure each monster has a unique ID
            }]
        })),
    removeMonster: (id: string): void =>
        set((state) => ({
            monsters: state.monsters.filter((m) => m.id !== id),
        })),
    updateMonster: (id: string, data: Partial<monsterForm>): void =>
        set((state) => ({
            monsters: state.monsters.map((m) =>
                m.id === id ? { ...m, ...data } : m
            ),
        })),
    setMonsters: (monsters: monsterForm[]): void => set({ monsters }),
}));