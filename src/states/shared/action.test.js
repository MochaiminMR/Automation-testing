/**
 * skenario test
 *
 * - asyncUsersAndThreads thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import api from "../../utils/api";
import asyncPopulateUsersAndThreads from "./action";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import { fetchThreadActionCreator } from "../threads/action";
import { fetchUsersActionCreator } from "../users/action";

// fake data 
const fakeThreadsResponse = [
  {
    id: 'thread-2',
    title: 'Thread Kedua',
    body: 'Ini adalah thread kedua',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'users-2',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0
  }
]

const fakeUserResponse = [
  {
    id: 'user-1',
    name: 'User Test 1',
    avatar: 'https://generated-image-url.jpg'
  }
]

const fakeErrorResponse = new Error('Ups, somethin went wrong');

describe('asyncPopulateUsersAndThreads thunk', () => {
    // backup and restore
    beforeEach(() => {
        api._geAllUsers = api.getAllUsers;
        api._getAllThreads = api.getAllThreads;
    });

    afterEach(() =>{
        api.getAllUsers = api._geAllUsers
        api.getAllThreads = api._geAllThreads

        // delete backup data
        delete api._geAllUsers
        delete api._geAllThreads
    })

    it('should dispatch action correctly when data fetching success', async () => {
        // arrange

        // stub implementation
        api.getAllUsers = () => Promise.resolve(fakeUserResponse);
        api.getAllThreads = () => Promise.resolve(fakeThreadsResponse)
        
        // mock dispatch
        const dispatch = vi.fn();


        // action
        await asyncPopulateUsersAndThreads()(dispatch)

        // assert
        // ekspetasinya dispatch akan memanggil .....
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith( fetchUsersActionCreator(fakeUserResponse));
        expect(dispatch).toHaveBeenCalledWith(fetchThreadActionCreator(fakeThreadsResponse));
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
    })
    
    it('should dispatch action and call alert correctly when data fetching failed', async () => {
        // arrange

        // stub implementation
        api.getAllThreads = () => Promise.reject(fakeErrorResponse);
        api.getAllUsers = () => Promise.reject(fakeErrorResponse);

        // mock dipstach
        const dispatch = vi.fn();

        // mock alert
        window.alert = vi.fn();

        // action
        await asyncPopulateUsersAndThreads()(dispatch); 

        // assert
        expect(dispatch).toHaveBeenCalled(showLoading())
        expect(dispatch).toHaveBeenCalled(hideLoading())
        expect(dispatch).toHaveBeenCalled(fakeErrorResponse.message)
    })
})