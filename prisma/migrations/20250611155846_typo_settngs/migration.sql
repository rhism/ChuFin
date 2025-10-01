/*
  Warnings:

  - You are about to drop the `userSettngs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "userSettngs";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "userSettings" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "currency" TEXT NOT NULL
);
