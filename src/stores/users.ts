import { defineStore } from 'pinia';
import { User } from '@/data/User'
import {useStorage} from "@/hooks/useStorage.ts";

const DATA_KEY = 'data'
const [data, setData] = useStorage(DATA_KEY);

interface UsersState {
    users: User[];
}

export const useUsersStore = defineStore('users', {
    state: (): UsersState => ({
        users: [],
    }),
    actions: {
        loadData() {
            if (data.value) this.users = data
        },
        saveData() {
            setData(this.users)
        },
        add() {
            console.log(this.users);
            this.users.push(new User())
        },
        remove(user: User) {
            const index = this.users.indexOf(user);
            if (index !== -1) {
                this.users.splice(index, 1);
                this.saveData()
            }
        },
        parseLabels(user: User) {
            user.labels.parsed = user.labels.value.split(';').map(text => ({
                text
            }))
            this.saveData()
        }
    },
});