-- CreateTable
CREATE TABLE "tasks" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "labels" (
    "id" SERIAL NOT NULL,
    "color" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "labels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks_labels" (
    "task_id" INTEGER NOT NULL,
    "label_id" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "tasks_labels_task_id_label_id_key" ON "tasks_labels"("task_id", "label_id");

-- AddForeignKey
ALTER TABLE "tasks_labels" ADD CONSTRAINT "tasks_labels_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks_labels" ADD CONSTRAINT "tasks_labels_label_id_fkey" FOREIGN KEY ("label_id") REFERENCES "labels"("id") ON DELETE CASCADE ON UPDATE CASCADE;
