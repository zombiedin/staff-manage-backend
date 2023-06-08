import { isNull } from 'lodash';
import {
  attr_mapping,
  attr_mapping_obj,
  custom_fields,
  unix_fields,
} from './clickup-variables';
import { PrismaClient } from '@prisma/client';
import { NotNull } from 'sequelize-typescript';
const prisma = new PrismaClient();
/**
 *
 * @param data
 */
export async function restructure(data: any) {
  const projects = []; // list of projects
  const tasks = data.tasks; // all tasks from GT&D (array)
  var update = 0;
  var create = 0;

  for (let i = 0; i < tasks.length; i++) {
    // for every task in array
    const p = tasks[i]; // let p act as a current task
    const project: { [key: string]: any } = {}; // act as empty json object of project

    // ### Loop to map simple data ###
    for (const jsonAttr of Object.keys(p)) {
      // for every attribute in p
      const dictKey = attr_mapping[jsonAttr]; // dictKey = our field name (can be config in clickup-variables.ts)
      if (p.hasOwnProperty(jsonAttr) && attr_mapping.hasOwnProperty(jsonAttr)) {
        // if both have the attribute
        const val = p[jsonAttr];
        if (val instanceof Array) {
          var arr = [];
          for (let m = 0; m < val.length; m++) {
            arr.push(val[m].username);
          }
          project[dictKey] = arr;
        } else {
          project[dictKey] = val; // set the field value to project
        }
      }
    }

    // ### Loop to map hierarchy data ###
    for (const jsonAttr of Object.keys(attr_mapping_obj)) {
      const dictKey = attr_mapping_obj[jsonAttr]; // our field name
      const attr: string[] = jsonAttr.split('.'); // list of attributes
      if (p.hasOwnProperty(attr[0])) {
        // if p has first attribute
        let temp = p[attr[0]]; // temp first attribute of p
        for (let k = 1; k < attr.length; k++) {
          // loop through every attribute
          if (temp != null) {
            temp = temp[attr[k]]; // get into next attribute
          } else {
            // if null
            temp = null;
            break;
          }
        }
        project[dictKey] = temp;
      }
    }

    // ### Loop to map custom fields ###
    const transformed_custom = p.custom_fields.reduce(
      (acc: { [key: string]: any }, obj: { [key: string]: any }) => {
        acc[obj.name] = obj;
        return acc;
      },
      {}
    );

    for (const custom of Object.keys(transformed_custom)) {
      if (
        transformed_custom.hasOwnProperty(custom) &&
        custom_fields.hasOwnProperty(custom)
      ) {
        const key = custom_fields[custom];
        const type = transformed_custom[custom].type;

        if (type == 'drop_down') {
          const options = transformed_custom[custom].type_config.options;
          const value = transformed_custom[custom].value;
          const solution = options[value];

          if (value >= 0) {
            project[key] = solution.name;
            if (solution.hasOwnProperty('color')) {
              project[key + '_color'] = solution.color;
            }
          } else {
            project[key] = null;
          }
        } else if (type == 'users') {
          if (transformed_custom[custom].hasOwnProperty('value')) {
            var arr = [];
            const full_arr = transformed_custom[custom].value;
            for (let t = 0; t < full_arr.length; t++) {
              arr.push(full_arr[t].email);
            }
            project[key] = arr;
          } else {
            project[key] = null;
          }
        } else if (type == 'labels') {
          if (transformed_custom[custom].hasOwnProperty('value')) {
            // const options = transformed_custom[custom].type_config.options;
            const team_ids = transformed_custom[custom].value;

            const reduced_options = transformed_custom[
              custom
            ].type_config.options.reduce(
              (acc: { [key: string]: any }, obj: { [key: string]: any }) => {
                acc[obj.id] = obj;
                return acc;
              },
              {}
            );

            const teams = [];
            for (let l = 0; l < team_ids.length; l++) {
              teams.push(reduced_options[team_ids[l]].label);
            }
            project[key] = teams;
          } else {
            project[key] = null;
          }
        } else if (type == 'url') {
          if (transformed_custom[custom].hasOwnProperty('value')) {
            project[key] = transformed_custom[custom].value;
          } else {
            project[key] = null;
          }
        }
      }
    }

    for (const unix of unix_fields) {
      if (!isNull(project[unix])) {
        project[unix] = new Date(Number(project[unix]));
      }
    }
    /////////////////////
    // store or update //
    /////////////////////
    const existingProject = await prisma.project.findUnique({
      where: { cu_id: project["cu_id"] },
    });
    if (existingProject) {
      //update
      //get status
      const stat = await prisma.status.findFirst({
        where: { desc: project.status_name }
      })
      //get solution
      if (project.solution != null) {
        const sol = await prisma.solution.findFirst({
          where: { desc: project.solution }
        })
        const updateProject = await prisma.project.update({
          where: { cu_id: project.cu_id },
          data: {
            p_name: project.p_name,
            p_desc: project.p_desc,
            start_date: project.start_date,
            end_date: project.end_date,
            solution: {
              connect: { sol_id: sol?.sol_id }
            },
            status: {
              connect: { status_id: stat!.status_id }
            },
            bu: project.bu,
            priority: project.priority,
            last_retrieve: new Date(),
          },
        });
      } else {
        const createProject = await prisma.project.update({
          where: { cu_id: project.cu_id },
          data: {
            p_name: project.p_name,
            p_desc: project.p_desc,
            start_date: project.start_date,
            end_date: project.end_date,
            status: {
              connect: { status_id: stat!.status_id }
            },
            bu: project.bu,
            priority: project.priority,
            last_retrieve: new Date(),
          },
        });
      }
      update++;

      if (project.teams != null) {
        const this_project = await prisma.project.findFirst({
          where: { cu_id: project.cu_id }
        });
        for (const team of project.teams) {
          const this_team = await prisma.team.findFirst({
            where: { t_desc: team }
          });
          const existingPart = await prisma.participate.findFirst({
            where: {
              p_id: this_project!.p_id,
              t_id: this_team!.t_id
            },
          });
          if (existingPart == null) {
            const participate = await prisma.participate.create({
              data: {
                project: {
                  connect: {
                    p_id: this_project!.p_id,
                  }
                },
                team: {
                  connect: {
                    t_id: this_team!.t_id
                  }
                }
              },
            });
          }
        }
      }
      if (project.assignees.length > 0) {
        const this_project = await prisma.project.findFirst({
          where: { cu_id: project.cu_id }
        });
        for (const person of project.assignees) {
          if (person == null) { continue; }
          const existingAssign = await prisma.assign.findFirst({
            where: {
              a_name: person,
              p_id: this_project!.p_id
            },
          });
          if (existingAssign == null) {
            const assign = await prisma.assign.create({
              data: {
                a_name: person,
                project: {
                  connect: {
                    p_id: this_project!.p_id
                  }
                }
              }
            });
          }
        }
      }
    } else {
      //get status
      const stat = await prisma.status.findFirst({
        where: { desc: project.status_name }
      })
      //get solution
      if (project.solution != null) {
        const sol = await prisma.solution.findFirst({
          where: { desc: project.solution }
        })
        const createProject = await prisma.project.create({
          data: {
            p_name: project.p_name,
            p_desc: project.p_desc,
            start_date: project.start_date,
            end_date: project.end_date,
            solution: {
              connect: { sol_id: sol!.sol_id }
            },
            status: {
              connect: { status_id: stat!.status_id }
            },
            bu: project.bu,
            create_date: project.create_date,
            ticket_url: project.ticket_url,
            space_url: project.space_url,
            cu_id: project.cu_id,
            priority: project.priority,
            first_retrieve: new Date(),
            last_retrieve: new Date(),
          },
        });
      } else {
        const createProject = await prisma.project.create({
          data: {
            p_name: project.p_name,
            p_desc: project.p_desc,
            start_date: project.start_date,
            end_date: project.end_date,
            status: {
              connect: { status_id: stat!.status_id }
            },
            bu: project.bu,
            create_date: project.create_date,
            ticket_url: project.ticket_url,
            space_url: project.space_url,
            cu_id: project.cu_id,
            priority: project.priority,
            first_retrieve: new Date(),
            last_retrieve: new Date(),
          },
        });
      }
      create++;
      ////////////////////////////////////////////////////////////////////////////////

      //////////////////////
      //  assign to team  //
      //////////////////////

      if (project.teams != null) {
        const this_project = await prisma.project.findFirst({
          where: { cu_id: project.cu_id }
        });
        for (const team of project.teams) {
          const this_team = await prisma.team.findFirst({
            where: { t_desc: team }
          });
          const participate = await prisma.participate.create({
            data: {
              project: {
                connect: {
                  p_id: this_project!.p_id,
                }
              },
              team: {
                connect: {
                  t_id: this_team!.t_id
                }
              }
            },
          });
        }////////////////////////////////////////////////////////////////
        if (project.assignees.length > 0) {
          const this_project = await prisma.project.findFirst({
            where: { cu_id: project.cu_id }
          });
          for (const person of project.assignees) {
            if (person == null) { continue; }
            const assign = await prisma.assign.create({
              data: {
                a_name: person,
                project: {
                  connect: {
                    p_id: this_project!.p_id
                  }
                }
              }
            });
          }
        }
      }
    }


    projects.push(project);
  }

  const result: { [key: string]: Array<any> } = {
    projects: projects,
  };

  console.log({ created: create, updated: update });
  return result;
}