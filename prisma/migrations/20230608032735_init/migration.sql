-- CreateTable
CREATE TABLE "Staff" (
    "s_id" TEXT NOT NULL,
    "t_id" TEXT NOT NULL,
    "r_id" TEXT NOT NULL,
    "dc_id" TEXT NOT NULL,
    "fname" TEXT NOT NULL,
    "lname" TEXT NOT NULL,
    "nickname" TEXT,
    "s_email" TEXT NOT NULL,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("s_id")
);

-- CreateTable
CREATE TABLE "Solution" (
    "sol_id" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "Solution_pkey" PRIMARY KEY ("sol_id")
);

-- CreateTable
CREATE TABLE "Status" (
    "status_id" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("status_id")
);

-- CreateTable
CREATE TABLE "Project" (
    "p_id" TEXT NOT NULL,
    "p_name" TEXT NOT NULL,
    "p_desc" TEXT,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "sol_id" TEXT,
    "bu" TEXT,
    "create_date" TIMESTAMP(3),
    "url" TEXT NOT NULL,
    "space" TEXT NOT NULL,
    "cu_id" TEXT NOT NULL,
    "priority" TEXT,
    "first_retrieve" TIMESTAMP(3) NOT NULL,
    "last_retrieve" TIMESTAMP(3) NOT NULL,
    "status_id" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("p_id")
);

-- CreateTable
CREATE TABLE "Participate" (
    "part_id" TEXT NOT NULL,
    "p_id" TEXT NOT NULL,
    "t_id" TEXT NOT NULL,

    CONSTRAINT "Participate_pkey" PRIMARY KEY ("part_id")
);

-- CreateTable
CREATE TABLE "Work_on" (
    "w_id" TEXT NOT NULL,
    "s_id" TEXT NOT NULL,
    "p_id" TEXT NOT NULL,
    "start" TIMESTAMP(3),
    "end" TIMESTAMP(3),
    "type" TEXT,
    "status" TEXT,

    CONSTRAINT "Work_on_pkey" PRIMARY KEY ("w_id")
);

-- CreateTable
CREATE TABLE "Staff_skill" (
    "ssk_id" TEXT NOT NULL,
    "sk_id" TEXT NOT NULL,
    "s_id" TEXT NOT NULL,

    CONSTRAINT "Staff_skill_pkey" PRIMARY KEY ("ssk_id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "sk_id" TEXT NOT NULL,
    "sk_desc" TEXT NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("sk_id")
);

-- CreateTable
CREATE TABLE "Role" (
    "r_id" TEXT NOT NULL,
    "r_desc" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("r_id")
);

-- CreateTable
CREATE TABLE "Team" (
    "t_id" TEXT NOT NULL,
    "t_desc" TEXT NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("t_id")
);

-- CreateTable
CREATE TABLE "User" (
    "u_id" TEXT NOT NULL,
    "u_email" TEXT NOT NULL,
    "auth_id" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("u_id")
);

-- CreateTable
CREATE TABLE "On_team" (
    "o_id" TEXT NOT NULL,
    "u_id" TEXT NOT NULL,
    "t_id" TEXT NOT NULL,

    CONSTRAINT "On_team_pkey" PRIMARY KEY ("o_id")
);

-- CreateTable
CREATE TABLE "Authen" (
    "auth_id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "see_all_members" BOOLEAN NOT NULL,
    "editor" BOOLEAN NOT NULL,

    CONSTRAINT "Authen_pkey" PRIMARY KEY ("auth_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Staff_s_id_key" ON "Staff"("s_id");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_dc_id_key" ON "Staff"("dc_id");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_s_email_key" ON "Staff"("s_email");

-- CreateIndex
CREATE UNIQUE INDEX "Solution_sol_id_key" ON "Solution"("sol_id");

-- CreateIndex
CREATE UNIQUE INDEX "Status_status_id_key" ON "Status"("status_id");

-- CreateIndex
CREATE UNIQUE INDEX "Project_p_id_key" ON "Project"("p_id");

-- CreateIndex
CREATE UNIQUE INDEX "Participate_part_id_key" ON "Participate"("part_id");

-- CreateIndex
CREATE UNIQUE INDEX "Work_on_w_id_key" ON "Work_on"("w_id");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_skill_ssk_id_key" ON "Staff_skill"("ssk_id");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_sk_id_key" ON "Skill"("sk_id");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_sk_desc_key" ON "Skill"("sk_desc");

-- CreateIndex
CREATE UNIQUE INDEX "Role_r_id_key" ON "Role"("r_id");

-- CreateIndex
CREATE UNIQUE INDEX "Role_r_desc_key" ON "Role"("r_desc");

-- CreateIndex
CREATE UNIQUE INDEX "Team_t_id_key" ON "Team"("t_id");

-- CreateIndex
CREATE UNIQUE INDEX "Team_t_desc_key" ON "Team"("t_desc");

-- CreateIndex
CREATE UNIQUE INDEX "User_u_id_key" ON "User"("u_id");

-- CreateIndex
CREATE UNIQUE INDEX "On_team_o_id_key" ON "On_team"("o_id");

-- CreateIndex
CREATE UNIQUE INDEX "Authen_auth_id_key" ON "Authen"("auth_id");
