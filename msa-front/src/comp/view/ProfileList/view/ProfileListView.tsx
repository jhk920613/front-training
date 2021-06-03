import React from 'react';
import {
    Button,
    Container,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableHead, TableRow,
    TextField,
    Typography
} from '@material-ui/core';
import Profile from '../../../model';

interface Props {
    profile: Profile;
    profileList: Profile[];
    onChangeProfile: (name: keyof Profile, value: string) => void;
    onAdd: () => void;
    onRemove: (selectedIndex: number) => void;
    onAttend: (selectedIndex: number) => void;
}

class ProfileListView extends React.Component<Props> {

    render() {

        const { profile, profileList, onChangeProfile, onAdd, onRemove, onAttend } = this.props;

        return (
            <Container>
                <div>
                    Profile List
                </div>
                <Grid container>
                    <Grid xs={4}>
                        <Typography>이름</Typography>
                        <TextField
                            value={profile.name}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeProfile('name', event.target.value)}
                        />
                    </Grid>
                    <Grid xs={4}>
                        <Typography>이메일</Typography>
                        <TextField
                            value={profile.email}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeProfile('email', event.target.value)}
                        />
                    </Grid>
                    <Grid xs={3}>
                        <Typography>나이</Typography>
                        <TextField
                            value={profile.age}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeProfile('age', event.target.value)}
                        />
                    </Grid>
                    <Grid xs={1}>
                        <Button onClick={() => onAdd()}>
                            추가
                        </Button>
                    </Grid>
                </Grid>

                <Table>
                    <TableHead>
                        <TableCell>이름</TableCell>
                        <TableCell>이메일</TableCell>
                        <TableCell>나이</TableCell>
                        <TableCell>출석여부</TableCell>
                        <TableCell />
                        <TableCell />
                    </TableHead>
                    <TableBody>
                        {
                            profileList.length > 0 ?
                                profileList.map((targetProfile: Profile, index: number) => (
                                    <TableRow key={index}>
                                        <TableCell>{targetProfile.name}</TableCell>
                                        <TableCell>{targetProfile.email}</TableCell>
                                        <TableCell>{targetProfile.age}</TableCell>
                                        <TableCell>{targetProfile.attendance}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => onRemove(index)}>
                                                삭제
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button onClick={() => onAttend(index)}>
                                                출석
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                                : '데이터가 없습니다.'
                        }
                    </TableBody>
                </Table>
            </Container>
        );
    }

}

export default ProfileListView;