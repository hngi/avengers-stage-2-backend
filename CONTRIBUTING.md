# Contributing to avengers-stage-2 project
:+1::tada: [How Can I Contribute?](#how-can-i-contribute)
<br>This section guides you through contributing to the Avengers-stage-2 project. 
<br>Following these guidelines helps maintainers and the contibuters align  together to make the process seamless. :computer: :computer:.

* Follow this process to reproduce a copy of the project locally.

    * Create a personal fork of the project repository on Github.

    * Clone the fork on your local machine. Your remote repository on Github is called origin. The repository on the HNG organization is called upstream. 
        * $ git clone git@github.com:{{username}}/avengers-stage-2.git
    * On your local system  add the original repository as a remote called upstream.
        * $ git remote add upstream git@github.com:hngi7/avengers-stage-2.git
    * Sync your local copy with the upstream copy and update the origin as well.
        * $ git pull upstream master && git push origin master
    * Create a new branch to work on! Branch from develop if it exists( else from master). It is recommended for every new feature you work on make a new branch and work from there.
        * git checkout -b {issue/story type}/{2-3 word summary} eg. feature/add-authentication or bug/fix-user-duplication
    * Set up project with all dependencies
     * If the project has tests run them!
    * Implement/fix your feature, comment your code.
    * Follow the code style of the project, including indentation.
    * After feature implementation, run tests again! (if it exists in the project)
    * Write or adapt tests as needed.
    * To keep to update with the main repo, be sure to pull upstream changes into your local repository.
    * Make sure your commit messages are to the point, sane and descriptive of the feature implemented or bug fixed on the branch
    * Push your branch to your fork on Github, the remote origin.
        * $ git push -u origin hotfix/readme-update
    * From your fork open a pull request in the correct branch. Target the project's develop branch(of the upstream repository) if there is one, else go for master!


