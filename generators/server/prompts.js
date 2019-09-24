/**
 * Copyright 2013-2019 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see https://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const chalk = require('chalk');

const constants = require('../generator-dotnetcore-constants');

function askForModuleName() {
    if (this.baseName) return;

    this.askModuleName(this);
}

function askForServerSideOpts() {
    const prompts = [
        {
            type: 'input',
            name: 'namespace',
            validate: input =>
                /^([a-z_A-Z]\w+(?:\.[a-z_A-Z]\w+)*)$/.test(input) ? true : 'The namespace you have provided is not a valid C# namespace',
            message: 'What is your default C# namespace?',
            default: 'MyCompany'
        },
        {
            type: 'list',
            name: 'databaseType',
            message: `Which ${chalk.yellow('*type*')} of database would you like to use?`,
            choices: [
                {
                    value: 'sql',
                    name: 'SQL (SQLite, PostgreSQL)'
                }
            ],
            default: 0
        },
        {
            when: response => response.databaseType === 'sql',
            type: 'list',
            name: 'prodDatabaseType',
            message: `Which ${chalk.yellow('*production*')} database would you like to use?`,
            choices: constants.SQL_DB_OPTIONS,
            default: 0
        },
        {
            when: response => response.databaseType === 'sql',
            type: 'list',
            name: 'devDatabaseType',
            message: `Which ${chalk.yellow('*development*')} database would you like to use?`,
            choices: response =>
                [
                    {
                        value: 'sqliteDisk',
                        name: 'SQLite with disk-based persistence'
                    },
                    {
                        value: 'sqliteMemory',
                        name: 'SQLite with in-memory persistence'
                    }
                ].concat(constants.SQL_DB_OPTIONS.find(it => it.value === response.prodDatabaseType)),
            default: 0
        }
    ];

    const done = this.async();

    this.prompt(prompts).then(props => {
        this.namespace = props.namespace;
        this.databaseType = props.databaseType;
        this.devDatabaseType = props.devDatabaseType;
        this.prodDatabaseType = props.prodDatabaseType;
        done();
    });
}

module.exports = {
    askForModuleName,
    askForServerSideOpts
//    askForSomething,
    // askForOptionalItems,
    // askFori18n
};
