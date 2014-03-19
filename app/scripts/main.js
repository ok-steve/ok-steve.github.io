$('#lifestream').lifestream({
    feedloaded: header,
    list: [
        {
            'service': 'github',
            'user': 'sccherry'
        },
        {
            'service': 'linkedin',
            'user': 'sccherry'
        },
        {
            'service': 'twitter',
            'user': 'stevenccherry'
        }
    ]
});

function header () {
    $('#lifestream').prepend('<h2>Recent activity</h2>');
}
