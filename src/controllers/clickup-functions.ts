import { isNull } from 'lodash';
import {
  attr_mapping,
  attr_mapping_obj,
  custom_fields,
  unix_fields,
} from './clickup-variables';
import isEqual from 'lodash/isEqual';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
/**
 *
 * @param data
 */
export async function restructure(data: any) {
  const projects = []; // list of projects
  const tasks = data.tasks; // all tasks from GT&D (array)

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
            arr.push(val[m].email);
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
        }
      }
    }
    for (const unix of unix_fields) {
      if (!isNull(project[unix])) {
        project[unix] = new Date(Number(project[unix]));
      }
    }

    const existingProject = await prisma.project.findUnique({
      where: { cu_id: project.cu_id },
    });

    if (existingProject) {
      //update
      const updateProject = await prisma.project.update({
        where: { cu_id: project.cu_id },
        data: {
          p_name: project.p_name,
          p_desc: project.p_desc,
          start_date: project.start_date,
          end_date: project.end_date,
          solution: project.solution,
          bu: project.bu,
          priority: project.priority,
          last_retrieve: new Date(),
        },
      });
    } else {
      //create project
      const createProject = await prisma.project.create({
        data: {
          p_name: project.p_name,
          p_desc: project.p_desc,
          start_date: project.start_date,
          end_date: project.end_date,
          solution: project.solution,
          bu: project.bu,
          create_date: project.create_date,
          url: project.url,
          space: project.space,
          cu_id: project.cu_id,
          priority: project.priority,
          first_retrieve: new Date(),
          last_retrieve: new Date(),
        },
      });
    }

    projects.push(project);
  }
  const result: { [key: string]: Array<any> } = {
    projects: projects,
  };

  // function findChanges(obj1: any, obj2: any, path: string = '') {
  //   const eq = isEqual(obj1, obj2);
  //   if (eq) { return; }
  //   if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
  //     console.log(`Change at path: ${path}`);
  //     console.log('Old value:', obj1);
  //     console.log('New value:', obj2);
  //   } else {
  //     for (const key in obj1) {
  //       if (Object.prototype.hasOwnProperty.call(obj1, key)) {
  //         const nestedPath = path ? `${path}.${key}` : key;
  //         findChanges(obj1[key], obj2[key], nestedPath);
  //       }
  //     }
  //   }
  // }

  return result;
}

/**
 *
 * @param data
 */
export function storeFromClickup(data: any) {}
