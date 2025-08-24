export interface FileModel {
    id: string;
    project_id: string;
    name: string;
    file_type: string;
    size: number;
    path: string;
    last_modified?: Date;
    created?: Date;
    is_folder: boolean;
}