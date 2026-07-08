-- CreateEnum
CREATE TYPE "TrainingType" AS ENUM ('RUNNING', 'SWIMMING', 'CYCLING', 'GYM', 'STRETCHING', 'YOGA');

-- CreateTable
CREATE TABLE "Training" (
    "id" SERIAL NOT NULL,
    "type" "TrainingType" NOT NULL,
    "duration" INTEGER NOT NULL,
    "calories" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Training_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exercise" (
    "id" SERIAL NOT NULL,
    "trainingId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseSet" (
    "id" SERIAL NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "approach" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION,

    CONSTRAINT "ExerciseSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseLap" (
    "id" SERIAL NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "lapNumber" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "distance" DOUBLE PRECISION,

    CONSTRAINT "ExerciseLap_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseSet" ADD CONSTRAINT "ExerciseSet_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseLap" ADD CONSTRAINT "ExerciseLap_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
