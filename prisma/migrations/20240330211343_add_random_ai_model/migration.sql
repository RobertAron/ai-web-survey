-- CreateEnum
CREATE TYPE "AiModelType" AS ENUM ('Republican', 'Democrat');

-- AlterTable
ALTER TABLE "user_page_tracking" ADD COLUMN     "selected_ai" "AiModelType" NOT NULL DEFAULT 'Republican';
