import React from 'react';
import { Box, Grid, TextField, Button, Checkbox } from '@material-ui/core';


interface Props {
    title: string;
    sentences: string;
    secret: boolean;
    onChangeProp: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClickRegistrationButton: () => void;
}
class QuestionFormView extends React.Component<Props> {
    //
    render() {
        //
        const { title, sentences, onChangeProp, onClickRegistrationButton } = this.props;

        return (
            <>
                <Box p={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={10}>
                            <TextField
                                name="title"
                                value={title}
                                fullWidth
                                onChange={onChangeProp}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Checkbox />
                        </Grid>
                    </Grid>
                    <Box>
                        <TextField
                            name="sentences"
                            value={sentences}
                            fullWidth
                            multiline
                            onChange={onChangeProp}
                        />
                    </Box>
                    <Grid container>
                        <Button
                            onClick={onClickRegistrationButton}
                            color="primary"
                        >
                            등록
                        </Button>
                    </Grid>
                </Box>
            </>
        )
    }
}

export default QuestionFormView;
