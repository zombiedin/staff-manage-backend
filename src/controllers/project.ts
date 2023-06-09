// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable node/no-unsupported-features/es-syntax */
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 *
 * Handle GET request to get examples
 * @param {Request} _req - Express request object
 * @param {Response} res - Express response object
 */

/**
 *
 * @param _req
 * @param res
 */
export async function getProjects(_req: Request, res: Response) {
    try {
        const projects = await prisma.project.findMany({
            select: {
                p_id: true,
                p_name: true,
                p_desc: true,
                //assignees,
                //members,
                bu: true,
                priority: true,
                ticket_url: true,
                space_url: true,
                last_retrieve: true,
                start_date: true,
                end_date: true,
                create_date: true,
                // status_id: false,
                // sol_id: false,
                solution: {
                    select: {
                        desc: true,
                        color: true,
                    }
                },
                status: {
                    select: {
                        desc: true,
                        color: true,
                    }
                },
                participate: {
                    select: {
                        // part_id: false,
                        // p_id: false,
                        // t_id: false,
                        team: {
                            select: {
                                t_desc: true,
                            },
                        },
                    },
                },
                assign: {
                    select: {
                        a_name: true,
                    }
                }
            },
        });
        var p = JSON.stringify(projects);
        var x = JSON.parse(p);
        x.forEach((node: any) => node.members = []);
        const mapping_team = x.map((proj: any) => ({
            participate: proj.participate.map((part: any) => part.team.t_desc)
        }));
        const mapping_assign = x.map((proj: any) => ({
            assign: proj.assign.map((part: any) => part.a_name)
        }));
        const mappedResult = x.map((proj: any, index: any) => ({
            ...proj,
            ...mapping_team[index],
            ...mapping_assign[index],
            participate: mapping_team[index].participate,
            assign: mapping_assign[index].assign
        }))

        res.json(mappedResult);
    } catch (error) {
        // Handle any errors that occur during the API call
        console.error('Error calling the other API:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
}

export async function mockupTSS(_req: Request, res: Response) {
    try {
        const team = await prisma.team.createMany({
            data: [
                { t_desc: "Application development" },
                { t_desc: "Tech PMO" },
                { t_desc: "Technology strategy & EA" },
                { t_desc: "Product & Design COE" },
                { t_desc: "Data & Analytics" },
                { t_desc: "Agile COE" },
                { t_desc: "Infrastructure" },
                { t_desc: "Information Security" },
                { t_desc: "Operations & Support" },
                { t_desc: "Core Systems & Platforms" },
            ]
        });
        const sol = await prisma.solution.createMany({
            data: [
                {
                    desc: "Waiting for Project committee",
                    color: "#808080",
                },
                {
                    desc: "SAP Only",
                    color: "#02BCD4",
                },
                {
                    desc: "Application Only",
                    color: "#ff7800",
                },
                {
                    desc: "App Integration SAP",
                    color: "#f9d900",
                },
                {
                    desc: "Big Data",
                    color: "#9b59b6",
                },
                {
                    desc: "APP Integrate SAP & Big Data",
                    color: "#EA80FC",
                },
                {
                    desc: "SAP Integration App",
                    color: "#0231E8",
                },
            ]
        });
        const status = await prisma.status.createMany({
            data: [
                {
                    desc: "rejected projects",
                    color: "#e50000",
                },
                {
                    desc: "inprogress",
                    color: "#81B1FF",
                },
                {
                    desc: "wait for start",
                    color: "#1bbc9c",
                },
                {
                    desc: "resource assigning",
                    color: "#04A9F4",
                },
                {
                    desc: "architect comm review",
                    color: "#AF7E2E",
                },
                {
                    desc: "architect design",
                    color: "#f9d900",
                },
                {
                    desc: "hold projects",
                    color: "#800000",
                },
                {
                    desc: "new project requests",
                    color: "#d3d3d3",
                },
                {
                    desc: "new service requests",
                    color: "#FF7FAB",
                },
                {
                    desc: "release to production",
                    color: "#2ecd6f"
                },
                {
                    desc: "closed projects",
                    color: "#6bc950"
                }
            ]
        });
        res.json({ team: team, solution: sol, status: status });
    } catch (error) {
        // Handle any errors that occur during the API call
        console.error('Error calling the other API:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
}

export async function deleteTSS(_req: Request, res: Response) {
    const del_team = await prisma.team.deleteMany();
    const del_sol = await prisma.solution.deleteMany();
    const del_stat = await prisma.status.deleteMany();
    res.json({ team: del_team.count, solution: del_sol.count, status: del_stat.count })
}

export async function deleteProject(_req: Request, res: Response) {
    const assign = await prisma.assign.deleteMany();
    const part = await prisma.participate.deleteMany();
    const proj = await prisma.project.deleteMany();
    res.json({ project_deleted: proj.count, participate_deleted: part.count, assignees_deleted: assign.count });
}
