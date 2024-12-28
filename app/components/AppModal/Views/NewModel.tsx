import React from "react";
import styles from "../AppModal.module.css";
import { OutlinedTextField, StyledButton } from "../../Styled";
// import { useAppContext } from "@/app/providers/AppProvider";

interface NewModelProps {
    onClose: () => void;
}

const NewModel: React.FC<NewModelProps> = ({
    onClose
}) => {

    // const { user } = useAppContext();

    const [modelDescription, setModelDescription] = React.useState('');
    const [modelName, setModelName] = React.useState('');
    const [errors, setErrors] = React.useState({
        modelName: '',
        modelDescription: '',
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrors({ modelName: '', modelDescription: '' });
        try {
            if (!modelName) {
                setErrors({ ...errors, modelName: 'Project name is required' });
                return;
            }
            if (modelName.trim().length < 6) {
                setErrors({ ...errors, modelName: 'Project name must be at least 6 characters' });
                return;
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.headerForm}>
                <h2>New Model</h2>
            </div>
            <OutlinedTextField
                id="modelName"
                label="Model name"
                onChange={(e) => setModelName(e.target.value)}
                size='small'
                value={modelName}
                variant="outlined"
                sx={{
                    width: '100%',
                }}
            />
            {errors.modelName && (<p aria-live="polite" className={styles.textError}>{errors.modelName}</p>)}
            <OutlinedTextField
                id="modelDescription"
                label="Model description"
                onChange={(e) => setModelDescription(e.target.value)}
                size='small'
                value={modelDescription}
                variant="outlined"
            />
            {errors.modelDescription && (<p aria-live="polite" className={styles.textError}>{errors.modelDescription}</p>)}
            <div className={styles.footerForm}>
    
                    <StyledButton
                        variant="contained"
                        type="button"
                    >Upload</StyledButton>
                    <StyledButton
                        variant="contained"
                        type="submit"
                        disabled={!modelName}
                    >Submit</StyledButton>
        
                    <StyledButton
                        variant="contained"
                        onClick={onClose}
                        type="button"
                    >Cancel</StyledButton>
                
            </div>
        </form>
    );
};

export default NewModel;