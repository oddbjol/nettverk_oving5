module.exports = {
    pressAnyKey: function(msg="Press any key to continue...", msg2=null){
        return new Promise((resolve, reject) => {
            console.log(msg);

            process.stdin.once('data', function () {
                process.stdin.unref();

                if(msg2 != null)
                    console.log(msg2);

                resolve();
            });
        });
    }
};