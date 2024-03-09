-- CreateTable
CREATE TABLE "randomized_user_questions" (
    "user_id" TEXT NOT NULL,
    "question_index" INTEGER NOT NULL,
    "question" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "randomized_user_questions_user_id_question_index_key" ON "randomized_user_questions"("user_id", "question_index");

-- AddForeignKey
ALTER TABLE "randomized_user_questions" ADD CONSTRAINT "randomized_user_questions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_page_tracking"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
