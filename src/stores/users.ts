import {defineStore} from 'pinia';
import {User} from '@/data/User'
import {useStorage} from "@/hooks/useStorage.ts";

const DATA_KEY = 'data'
// @ts-ignore
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
        saveLabels() {
            this.users.forEach((user: User) => {
                if (user.labels && typeof user.labels === 'string') {
                    const toArray = user.labels.split(';')
                    user.labels = toArray.map((item: string) => {
                        if (item) {
                            return {text: item}
                        }
                    }).filter((item: any) => item)
                }
            })
        },
        saveData() {
            this.saveLabels()
            setData(this.users)
        },
        add() {
            this.users.push(new User())
        },
        remove(user: User) {
            const index = this.users.indexOf(user);
            if (index !== -1) {
                this.users.splice(index, 1);
                this.saveData()
            }
        },
    },
});