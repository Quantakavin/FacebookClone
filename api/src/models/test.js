const firstFriendList = [
    {"userId": 4, "friendId": 2},
    {"userId": 4, "friendId": 5},
    {"userId": 4, "friendId": 6},
    {"userId": 4, "friendId": 7},
    {"userId": 4, "friendId": 8},
    {"userId": 4, "friendId": 9},
]

const secondFriendList = [
    {"userId": 5, "friendId": 2},
    {"userId": 5, "friendId": 10},
    {"userId": 5, "friendId": 611},
    {"userId": 5, "friendId": 7},
    {"userId": 5, "friendId": 80},
    {"userId": 5, "friendId": 92},
]


const combineArray = [...firstFriendList, ...secondFriendList];

const mutualFriend = [];

firstFriendList.map(f => {
    secondFriendList.map(s => {
        f.friendId === s.friendId ?
            mutualFriend.push({"friendId": s.friendId}):
            ""
    })
    
})

console.log(combineArray);
