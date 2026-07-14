-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "activeTrainingId" INTEGER;

-- CreateTable
CREATE TABLE "ActiveTraining" (
    "id" SERIAL NOT NULL,
    "type" "TrainingType" NOT NULL,
    "duration" INTEGER NOT NULL,
    "calories" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActiveTraining_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_activeTrainingId_fkey" FOREIGN KEY ("activeTrainingId") REFERENCES "ActiveTraining"("id") ON DELETE SET NULL ON UPDATE CASCADE;
