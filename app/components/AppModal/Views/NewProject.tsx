import React from "react";
import styles from "../AppModal.module.css";
import { OutlinedTextField, StyledButton } from "../../Styled";
import { useAppContext } from "@/app/providers/AppProvider";

interface NewProjectProps {
    onClose: () => void;
}

const NewProject: React.FC<NewProjectProps> = ({
    onClose
}) => {

    const { createProject } = useAppContext();

    const [projectName, setProjectName] = React.useState('');
    const [projectDescription, setProjectDescription] = React.useState('');
    const [errors, setErrors] = React.useState({
        projectName: '',
        projectDescription: '',
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrors({ projectName: '', projectDescription: '' });
        try {
            if (!projectName) {
                setErrors({ ...errors, projectName: 'Project name is required' });
                return;
            }
            if (projectName.trim().length < 6) {
                setErrors({ ...errors, projectName: 'Project name must be at least 6 characters' });
                return;
            }
            await createProject(
                projectName,
                projectDescription
            );
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.headerForm}>
                <h2>New Project</h2>
            </div>
            <OutlinedTextField
                autoComplete="off"
                id="projectName"
                label="Project name"
                onChange={(e) => setProjectName(e.target.value)}
                size='small'
                value={projectName}
            />
            {errors.projectName && (<p aria-live="polite" className={styles.textError}>{errors.projectName}</p>)}
            <OutlinedTextField
                autoComplete="off"
                id="projectDescription"
                label="Project description"
                onChange={(e) => setProjectDescription(e.target.value)}
                size='small'
                value={projectDescription}
            />
            {errors.projectDescription && (<p aria-live="polite" className={styles.textError}>{errors.projectDescription}</p>)}
            <div className={styles.footerForm}>
                <StyledButton
                    variant="contained"
                    type="submit"
                    disabled={!projectName}
                >Submit</StyledButton>
                <StyledButton
                    variant="contained"
                    onClick={onClose}
                >Cancel</StyledButton>
            </div>
        </form>
    );
};

export default NewProject;