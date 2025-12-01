// import userReducer, { updateUsername } from "../userSlice";

test.skip("updateUsernameを実行するとポストが追加される", () => {
  const initialState = {
    users: [
      {
        id: 501,
        name: 'eiki',
        email: 'mail@mail.com',
      }
    ]
  };
  // const newState = userReducer(initialState, updateUsername({id: 501, name: 'eiki2'}));
  // expect(newState.users[0].id).toBe(501);
  // expect(newState.users[0].name).toBe('eiki2');
  // expect(newState.users[0].email).toBe('mail@mail.com');
});
