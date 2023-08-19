```bash
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nickname` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
);

CREATE TABLE `workspaces` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `url` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `OwnerId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `url` (`url`),
  KEY `OwnerId` (`OwnerId`),
  CONSTRAINT `workspaces_ibfk_1` FOREIGN KEY (`OwnerId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE `workspace_members` (
  `editPermission` tinyint(1) NOT NULL DEFAULT '0',
  `isLoggedIn` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int NOT NULL,
  `WorkspaceId` int NOT NULL,
  PRIMARY KEY (`UserId`,`WorkspaceId`),
  KEY `WorkspaceId` (`WorkspaceId`),
  CONSTRAINT `workspace_members_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `workspace_members_ibfk_2` FOREIGN KEY (`WorkspaceId`) REFERENCES `workspaces` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `WorkspaceId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `WorkspaceId` (`WorkspaceId`),
  CONSTRAINT `items_ibfk_1` FOREIGN KEY (`WorkspaceId`) REFERENCES `workspaces` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE `revenues` (
  `id` int NOT NULL AUTO_INCREMENT,
  `month` int NOT NULL,
  `company` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `amount` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `WorkspaceId` int DEFAULT NULL,
  `ItemId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `WorkspaceId` (`WorkspaceId`),
  KEY `ItemId` (`ItemId`),
  CONSTRAINT `revenues_ibfk_1` FOREIGN KEY (`WorkspaceId`) REFERENCES `workspaces` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `revenues_ibfk_2` FOREIGN KEY (`ItemId`) REFERENCES `items` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE `revenue_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `day` int DEFAULT NULL,
  `company` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `comment` text COLLATE utf8mb4_general_ci,
  `RevenueId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `RevenueId` (`RevenueId`),
  CONSTRAINT `revenue_details_ibfk_1` FOREIGN KEY (`RevenueId`) REFERENCES `revenues` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);
```