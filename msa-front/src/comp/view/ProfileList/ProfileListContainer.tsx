import React from 'react';
import { observer, inject } from 'mobx-react';
import Profile from '../../model';
import ProfileListView from "./view/ProfileListView";
import autobind from 'autobind-decorator';
import ProfileStateKeeper from '../../state';

interface Props {
    initialText?: string;   // ?를 붙이면 있으면 쓰고 없으면 안쓴다.
    profileStateKeeper?: ProfileStateKeeper;
}

@inject('profileStateKeeper')
@observer
@autobind   // 이 클래스 내에서 메소드가 호출되는게 아니라 View 등으로 메소드를 넘길 때 사용하는쪽의 this 와의 정의가 모호해져서 필요
class ProfileListContainer extends React.Component<Props> {

    // keyof 는 name 에는 Profile 에 있는 값만 들어간다는 의미
    onChangeProfile(name: keyof Profile, value: string): void {
        const { profileStateKeeper } = this.props;

        // profileStateKeeper.setProfile(name, value);
        profileStateKeeper && profileStateKeeper.setProfile(name, value);
    }

    onAdd(): void {
        const { profileStateKeeper } = this.props;

        // profileStateKeeper.addProfile();
        profileStateKeeper && profileStateKeeper?.addProfile();
    }

    onRemove(selectedIndex: number): void {
        const { profileStateKeeper } = this.props;

        // profileStateKeeper.removeProfile(selectedIndex);
        profileStateKeeper && profileStateKeeper.removeProfile(selectedIndex);
    }

    onAttend(selectedIndex: number): void {
        const { profileStateKeeper } = this.props;

        profileStateKeeper && profileStateKeeper.attendProfile(selectedIndex);
    }

    render() {

        const { profileStateKeeper } = this.props;

        if(!profileStateKeeper) {
            return null;
        }

        return (
           <ProfileListView
               profile={profileStateKeeper.profile}
               profileList={profileStateKeeper.profileList}
               onChangeProfile={this.onChangeProfile}
               onAdd={this.onAdd}
               onRemove={this.onRemove}
               onAttend={this.onAttend}
           />
        );
    }
}

export default ProfileListContainer;