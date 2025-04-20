-- CreateEnum
CREATE TYPE "ExtraInfoType" AS ENUM ('Control', 'Basic', 'Informative', 'Directed', 'Video');

-- CreateEnum
CREATE TYPE "ControlSubtype" AS ENUM ('None', 'Republican', 'Democrat');

-- AlterTable
ALTER TABLE "user_page_tracking" ADD COLUMN     "control_subtype" "ControlSubtype" NOT NULL DEFAULT 'None',
ADD COLUMN     "extra_info_type" "ExtraInfoType" NOT NULL DEFAULT 'Control';
