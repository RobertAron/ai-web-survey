-- AlterTable
ALTER TABLE "form_response" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "user_page_tracking" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;
