-- AlterTable
ALTER TABLE "user_page_tracking" ADD COLUMN     "user_page_index" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "user_page_order" TEXT[] DEFAULT ARRAY[]::TEXT[];
