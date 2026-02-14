/*
  Warnings:

  - The values [Control] on the enum `AiModelType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `control_subtype` on the `user_page_tracking` table. All the data in the column will be lost.
  - You are about to drop the column `extra_info_type` on the `user_page_tracking` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AiModelType_new" AS ENUM ('Republican', 'Democrat');
ALTER TABLE "user_page_tracking" ALTER COLUMN "selected_ai" DROP DEFAULT;
ALTER TABLE "user_page_tracking" ALTER COLUMN "selected_ai" TYPE "AiModelType_new" USING ("selected_ai"::text::"AiModelType_new");
ALTER TYPE "AiModelType" RENAME TO "AiModelType_old";
ALTER TYPE "AiModelType_new" RENAME TO "AiModelType";
DROP TYPE "AiModelType_old";
ALTER TABLE "user_page_tracking" ALTER COLUMN "selected_ai" SET DEFAULT 'Republican';
COMMIT;

-- AlterTable
ALTER TABLE "user_page_tracking" DROP COLUMN "control_subtype",
DROP COLUMN "extra_info_type",
ADD COLUMN     "causal" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "risk" INTEGER NOT NULL DEFAULT 0;

-- DropEnum
DROP TYPE "ControlSubtype";

-- DropEnum
DROP TYPE "ExtraInfoType";
