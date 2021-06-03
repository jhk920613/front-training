import {makeObservable, observable, runInAction} from 'mobx'
import Profile from '../model';

class ProfileStateKeeper {

    static instance: ProfileStateKeeper;

    profile: Profile = new Profile();
    profileList: Profile[] = [];

    constructor() {
        makeObservable(this, {
            profile: observable,
            profileList: observable,
        });
    }

    // keyof 는 name 에는 Profile 에 있는 값만 들어간다는 의미
    setProfile(name: keyof Profile, value: string): void {
        // this.profile = {
        //     ...this.profile,
        //     [name]: value
        // };
        runInAction(() => {
            this.profile = {
                ...this.profile,
                [name]: value
            };
        });
    }

    addProfile(): void {
        // this.profileList = this.profileList.concat([this.profile]);
        // this.profile = new Profile();
        runInAction(() => {
            this.profileList = this.profileList.concat([this.profile]);
            this.profile = new Profile();
        });
    }

    removeProfile(selectedIndex: number): void {
        // this.profileList = this.profileList.filter((profile: Profile, index : number) => index !== selectedIndex);
        runInAction(() => {
            this.profileList = this.profileList.filter((profile: Profile, index : number) => index !== selectedIndex);
        });
    }

    attendProfile(selectedIndex: number): void {
        // this.profileList = this.profileList.map((profile: Profile, index: number) => {
        //     if(index === selectedIndex) {
        //         return {...profile, attendance: '출석완료'}
        //     } else {
        //         return profile;
        //     }
        // });

        runInAction(() => {
            this.profileList = this.profileList.map((profile: Profile, index: number) => {
                if(index === selectedIndex) {
                    return {...profile, attendance: '출석완료'}
                } else {
                    return profile;
                }
            });
        });
    }
}

ProfileStateKeeper.instance = new ProfileStateKeeper(); // 싱글톤
export default ProfileStateKeeper;
