
class Profile {
    name: string = '';  // 초기값 필수
    email: string = '';
    age: string = '';
    attendance: string = '-';

    constructor(profile?: Profile) {
        if(profile) {
            Object.assign(this, profile);
        }
    }
}

export default Profile;