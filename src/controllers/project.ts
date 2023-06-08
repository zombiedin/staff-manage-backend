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

// export async function mockupProject(_req: Request, res: Response) {
//     const projects = await prisma.project.createMany({
//         data: [
//             {
//                 p_name: "Project 1",
//                 p_desc: "This is\ndescription for\nProject 1",
//                 start_date: new Date(2023, 3, 1),
//                 end_date: new Date(2023, 3, 7),
//                 sol_id: "1fbdece7-eea7-46c7-9f81-83eae9128f85",
//                 bu: "Venture",
//                 create_date: new Date(2023, 2, 1),
//                 url: "https://app.clickup.com/t/860qqeafn",
//                 space: "https://app.clickup.com/36834408/v/s/90030305706",
//                 cu_id: "860qqbgfr",
//                 priority: "Normal",
//                 first_retrieve: new Date(2023, 2, 30),
//                 last_retrieve: new Date(),
//                 status_id: "10563567-b03d-4073-8aac-f932eaba58f3",
//             },
//             {
//                 p_name: "Project 2",
//                 p_desc: "This is\ndescription for\nProject 2",
//                 start_date: new Date(2023, 3, 2),
//                 end_date: new Date(2023, 3, 7),
//                 sol_id: "1fbdece7-eea7-46c7-9f81-83eae9128f85",
//                 bu: "Venture",
//                 create_date: new Date(2023, 2, 2),
//                 url: "https://app.clickup.com/t/860qqeafn",
//                 space: "https://app.clickup.com/36834408/v/s/90030305706",
//                 cu_id: "860qqbgfr",
//                 priority: "Normal",
//                 first_retrieve: new Date(2023, 2, 30),
//                 last_retrieve: new Date(),
//                 status_id: "23fb42f5-bccd-4a34-9489-6e6c101c7fce",
//             },
//             {
//                 p_name: "Project 3",
//                 p_desc: "This is\ndescription for\nProject 3",
//                 start_date: new Date(2023, 3, 3),
//                 end_date: new Date(2023, 3, 7),
//                 sol_id: "2d2e61a1-fb65-4255-9a62-443f6cd39915",
//                 bu: "Coretech",
//                 create_date: new Date(2023, 2, 3),
//                 url: "https://app.clickup.com/t/860qqeafn",
//                 space: "https://app.clickup.com/36834408/v/s/90030305706",
//                 cu_id: "860qqbgfr",
//                 priority: "Normal",
//                 first_retrieve: new Date(2023, 2, 30),
//                 last_retrieve: new Date(),
//                 status_id: "2f05d41d-7a8f-484d-b004-6a80b79d671d",
//             },
//             {
//                 p_name: "Project 4",
//                 p_desc: "This is\ndescription for\nProject 4",
//                 start_date: new Date(2023, 3, 4),
//                 end_date: new Date(2023, 3, 7),
//                 sol_id: "2d2e61a1-fb65-4255-9a62-443f6cd39915",
//                 bu: "Coretech",
//                 create_date: new Date(2023, 2, 4),
//                 url: "https://app.clickup.com/t/860qqeafn",
//                 space: "https://app.clickup.com/36834408/v/s/90030305706",
//                 cu_id: "860qqbgfr",
//                 priority: "Normal",
//                 first_retrieve: new Date(2023, 2, 30),
//                 last_retrieve: new Date(),
//                 status_id: "3ec7af99-3bbb-44dd-9d4d-eca968d24566",
//             },
//             {
//                 p_name: "Project 5",
//                 p_desc: "This is\ndescription for\nProject 5",
//                 start_date: new Date(2023, 3, 5),
//                 end_date: new Date(2023, 3, 7),
//                 sol_id: "538dd022-91ee-4d0a-9393-0688f0541118",
//                 bu: "PET",
//                 create_date: new Date(2023, 2, 5),
//                 url: "https://app.clickup.com/t/860qqeafn",
//                 space: "https://app.clickup.com/36834408/v/s/90030305706",
//                 cu_id: "860qqbgfr",
//                 priority: "Normal",
//                 first_retrieve: new Date(2023, 2, 30),
//                 last_retrieve: new Date(),
//                 status_id: "967f831d-7445-41b2-bd84-bb9a516a057f",
//             },
//             {
//                 p_name: "Project 6",
//                 p_desc: "This is\ndescription for\nProject 6",
//                 start_date: new Date(2023, 3, 6),
//                 end_date: new Date(2023, 4, 7),
//                 sol_id: "63c13837-617c-423b-a9ba-702420c54f46",
//                 bu: "PET",
//                 create_date: new Date(2023, 2, 6),
//                 url: "https://app.clickup.com/t/860qqeafn",
//                 space: "https://app.clickup.com/36834408/v/s/90030305706",
//                 cu_id: "860qqbgfr",
//                 priority: "Normal",
//                 first_retrieve: new Date(2023, 2, 30),
//                 last_retrieve: new Date(),
//                 status_id: "c29275c3-77c2-401b-bf1a-1b32d866f4a1",
//             },
//             {
//                 p_name: "Project 7",
//                 p_desc: "This is\ndescription for\nProject 7",
//                 start_date: new Date(2023, 3, 7),
//                 end_date: new Date(2023, 4, 7),
//                 sol_id: "9aa296d4-fa04-492d-bd9d-4f97ccb340f8",
//                 bu: "IB",
//                 create_date: new Date(2023, 2, 7),
//                 url: "https://app.clickup.com/t/860qqeafn",
//                 space: "https://app.clickup.com/36834408/v/s/90030305706",
//                 cu_id: "860qqbgfr",
//                 priority: "Normal",
//                 first_retrieve: new Date(2023, 2, 30),
//                 last_retrieve: new Date(),
//                 status_id: "cc2f9196-c3f7-455f-9e67-2a45d5285439",
//             },
//             {
//                 p_name: "Project 8",
//                 p_desc: "This is\ndescription for\nProject 8",
//                 start_date: new Date(2023, 3, 8),
//                 end_date: new Date(2023, 4, 7),
//                 sol_id: "b854e287-b6c0-4f9f-aff2-8b71ae166b21",
//                 bu: "IB",
//                 create_date: new Date(2023, 2, 8),
//                 url: "https://app.clickup.com/t/860qqeafn",
//                 space: "https://app.clickup.com/36834408/v/s/90030305706",
//                 cu_id: "860qqbgfr",
//                 priority: "Normal",
//                 first_retrieve: new Date(2023, 2, 30),
//                 last_retrieve: new Date(),
//                 status_id: "d3acf8b4-b989-4380-8f04-4fc9d8af4cdc",
//             },
//             {
//                 p_name: "Project 9",
//                 p_desc: "This is\ndescription for\nProject 9",
//                 start_date: new Date(2023, 3, 9),
//                 end_date: new Date(2023, 4, 7),
//                 sol_id: "b854e287-b6c0-4f9f-aff2-8b71ae166b21",
//                 bu: "Food",
//                 create_date: new Date(2023, 2, 9),
//                 url: "https://app.clickup.com/t/860qqeafn",
//                 space: "https://app.clickup.com/36834408/v/s/90030305706",
//                 cu_id: "860qqbgfr",
//                 priority: "Normal",
//                 first_retrieve: new Date(2023, 2, 30),
//                 last_retrieve: new Date(),
//                 status_id: "d82c2dcf-ba52-4911-951f-258cfcbff8fc",
//             },
//             {
//                 p_name: "Project 10",
//                 p_desc: "This is\ndescription for\nProject 10",
//                 start_date: new Date(2023, 3, 10),
//                 end_date: new Date(2023, 4, 7),
//                 sol_id: "9aa296d4-fa04-492d-bd9d-4f97ccb340f8",
//                 bu: "Food",
//                 create_date: new Date(2023, 2, 10),
//                 url: "https://app.clickup.com/t/860qqeafn",
//                 space: "https://app.clickup.com/36834408/v/s/90030305706",
//                 cu_id: "860qqbgfr",
//                 priority: "Normal",
//                 first_retrieve: new Date(2023, 2, 30),
//                 last_retrieve: new Date(),
//                 status_id: "10563567-b03d-4073-8aac-f932eaba58f3",
//             },
//         ]
//     });
//     res.json({ projects: projects });
// }

export async function mockupPart(_req: Request, res: Response) {
    const parts = await prisma.participate.createMany({
        data: [
            {
                p_id: "51cd38fe-c7e6-4b8c-a699-67642c722a03",
                t_id: "7c2c8a0c-3457-446f-be9c-556ab48ed107",
            },
            {
                p_id: "51cd38fe-c7e6-4b8c-a699-67642c722a03",
                t_id: "f9cd5346-84f9-4bfb-bbc2-d384b0d066b7",
            },
            {
                p_id: "51cd38fe-c7e6-4b8c-a699-67642c722a03",
                t_id: "981c5285-8ddf-412a-9866-6b475a8ca76a",
            },
        ]
    });
    res.json({ participate: parts });
}