import AddMonsterForm from "@/pages/main/components/AddMonsterForm";
import { Card } from "@/components/Card";
import { Button } from "@/components/ui/button";
import { ButtonStyled } from "@/components/ui/buttonStyled";
import { useMonsterStore } from "@/store/useMonsterStore";
import { useStore } from "zustand";
import { monsterForm } from "../schema";

export const RegisterStep = ({
  handleSubmit,
  handleStart,
  hasMonster = false,
}: {
  handleStart: () => void;
  handleSubmit: (values: monsterForm) => void;
  hasMonster?: boolean;
}) => {
  // ✅ Alternativa - selecionar individualmente
  const monsters = useStore(useMonsterStore, (state) => state.monsters);
  const removeMonster = useStore(useMonsterStore, (state) => state.removeMonster);

  return (
    <>
      <AddMonsterForm hasMonster={hasMonster} handleSubmit={handleSubmit} />
      {monsters.length > 0 && (<><div className="gap-2 flex">
        {monsters.map((monster, index) => (
          <Card key={index} className="flex flex-col gap-2 w-[350px] h-[480px]">
            <h3 className="text-xl font-bold">{monster.name}</h3>
            <img
              src={monster.image}
              alt={monster.name}
              className="w-full h-[200px] object-cover rounded-sm"
            />
            <div className="flex flex-col gap-2 border p-2 rounded-sm">
              <p className="font-bold">Health: {monster.health}</p>
              <p className="font-bold">Attack: {monster.attack}</p>
              <p className="font-bold">Defense: {monster.defense}</p>
              <p className="font-bold">Speed: {monster.speed}</p>
            </div>

            <Button onClick={() => removeMonster(monster.id)}>Deletar</Button>
          </Card>
        ))}

      </div>
        <div />
        {monsters.length > 0 && (
          <ButtonStyled disabled={monsters.length < 2} onClick={handleStart} className="mt-4">
            Start Battle
          </ButtonStyled>
        )}</>)}
    </>
  );
};
