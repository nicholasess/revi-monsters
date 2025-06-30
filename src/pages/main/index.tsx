import { Container } from "@/components/Container";
import React from "react";
import { RegisterStep } from "./components/Register";
import { Progress } from "@/components/Progress";
import { useMain } from "./useMain";
import { Results } from "./components/Results";

const BattleArena: React.FC = () => {
  const { monsters, step, handleStart, handleAddMonter, progress, isFighting, winner, handleRestart } = useMain()

  return (
    <Container isDisabled={monsters.length === 0 || (step === 1 || step === 2)}>
      {step === 0 && (
        <RegisterStep
          handleStart={handleStart}
          handleSubmit={handleAddMonter}
          hasMonster={monsters.length > 0}
        />
      )}

      {step === 1 && <Progress progress={progress} />}

      {step === 2 && (
        <Results handleRestart={handleRestart} winner={winner} isFighting={isFighting} />)}
    </Container>
  );
};

export default BattleArena;
