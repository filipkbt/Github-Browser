param(
    [string]$fireBaseToken,
    [string]$fireBaseProject,
    [string]$releaseMessage
)

Push-Location 'drop\dist'

npm i -g firebase-tools
write-host "starting deploy...";
firebase --version;
firebase deploy --token $fireBaseToken --project $fireBaseProject --message "Release: $releaseMessage";
write-host "deployment completed";

Pop-Location