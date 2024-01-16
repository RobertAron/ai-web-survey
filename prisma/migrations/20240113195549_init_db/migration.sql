-- CreateTable
CREATE TABLE "user_page_tracking" (
    "user_id" TEXT NOT NULL,
    "current_page" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "form_response" (
    "user_id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "response" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "conversation" (
    "user_id" TEXT NOT NULL,
    "conversation_id" TEXT NOT NULL,
    "conversation" JSONB NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_page_tracking_user_id_key" ON "user_page_tracking"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "form_response_user_id_question_id_key" ON "form_response"("user_id", "question_id");

-- CreateIndex
CREATE UNIQUE INDEX "conversation_user_id_conversation_id_key" ON "conversation"("user_id", "conversation_id");
