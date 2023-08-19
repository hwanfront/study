'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      nickname: '김하나',
      email: 'example1@gmail.com',
      password: 1234,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      nickname: '김두나',
      email: 'example2@gmail.com',
      password: 1234,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      nickname: '김세나',
      email: 'example3@gmail.com',
      password: 1234,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
    const users = await queryInterface.sequelize.query(`SELECT id FROM users;`);
    const usersRows = users[0];

    await queryInterface.bulkInsert('workspaces', [{
      ownerId: usersRows[0].id,
      name: '2022 매출 현황',
      url: '2022 매출 현황',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      ownerId: usersRows[2].id,
      name: '2023 매출 현황',
      url: '2023 매출 현황',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);

    const workspaces = await queryInterface.sequelize.query(`SELECT id FROM workspaces;`);
    const workspacesRows = workspaces[0];

    await queryInterface.bulkInsert('workspace_members', [{
      userId: usersRows[0].id,
      workspaceId: workspacesRows[0].id,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: usersRows[2].id,
      workspaceId: workspacesRows[1].id,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);

    await queryInterface.bulkInsert('items', ['접착제', '원료고무', '기타약품', '성형', '가공', '상품'].map((name) => ({
      workspaceId: workspacesRows[0].id,
      name,
    })));

    await queryInterface.bulkInsert('items', ['접착제', '원료고무', '기타약품', '성형', '상품'].map((name) => ({
      workspaceId: workspacesRows[1].id,
      name,
    })));

    console.log('a');
    const items = await queryInterface.sequelize.query(`SELECT id FROM items`);
    const itemsRows = items[0];
    const revenues = [
      { month: 1, company: '진양', amount: 13765500, itemId: itemsRows[0].id, day: 16, comment: '비고' },
      { month: 1, company: 'POS', amount: 127000000, itemId: itemsRows[1].id },
      { month: 1, company: '고딘', amount: 5350000, itemId: itemsRows[1].id },
      { month: 1, company: 'PCK', amount: 78000000, itemId: itemsRows[1].id },
      { month: 1, company: '태성', amount: 2184000, itemId: itemsRows[1].id },
      { month: 1, company: '고딘', amount: 5200000, itemId: itemsRows[1].id },
      { month: 1, company: '이화', amount: 1900000, itemId: itemsRows[2].id },
      { month: 1, company: 'PCK', amount: 64290500, itemId: itemsRows[2].id },
      { month: 1, company: 'PCK', amount: 98080000, itemId: itemsRows[3].id },
    ]

    await queryInterface.bulkInsert('revenues', revenues.map(({ month, company, amount}) => ({
      month,
      workspaceId: workspacesRows[0].id,
      company,
      amount,
      createdAt: new Date(),
      updatedAt: new Date()
    })));

    await queryInterface.bulkInsert('revenue_details', revenues
      .filter((data) => data.day || data.comment)
      .map((data) => ({
        day: data?.day,
        comment: data?.comment
    })));
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('workspaces', null, {});
    await queryInterface.bulkDelete('workspace_members', null, {});
    await queryInterface.bulkDelete('items', null, {});
    await queryInterface.bulkDelete('revenues', null, {});
    await queryInterface.bulkDelete('revenue_details', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
