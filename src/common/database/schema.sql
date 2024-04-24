CREATE TABLE `parts` (
    `id` bigint unsigned NOT NULL AUTO_INCREMENT,

    `name` varchar(128) COLLATE utf8mb4_unicode_ci NULL DEFAULT '',
    `description` varchar(512) COLLATE utf8mb4_unicode_ci NULL DEFAULT '',
    
    `data_json` JSON,
    
    `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NULL DEFAULT NULL,
    
    PRIMARY KEY (`id`),    
    UNIQUE INDEX `IX_parts_name`(`name`) USING BTREE    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `part_files` (
    `id` bigint unsigned NOT NULL AUTO_INCREMENT,

    `origin_file_name` varchar(512) COLLATE utf8mb4_unicode_ci NULL DEFAULT '',
    `dest_path` varchar(512) COLLATE utf8mb4_unicode_ci NULL DEFAULT '',
    `dest_file_name` varchar(512) COLLATE utf8mb4_unicode_ci NULL DEFAULT '',
    
    `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NULL DEFAULT NULL,
    
    PRIMARY KEY (`id`),    
    UNIQUE INDEX `IX_part_files_file_name`(`file_name`) USING BTREE    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;