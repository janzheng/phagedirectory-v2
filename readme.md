

# The Phage Directory

Visit us at [phage.directory](http://phage.directory).

## Mission

We are experiencing a global antibiotic resistance crisis, and we require alternative measures to treat patients unable to combat bacterial infections. Data collected by researchers around the world are stacking up in favour of a place for phage therapy in modern medicine.

Although dozens of labs around the world routinely cultivate phages against most bacterial pathogens currently faced by patients, many challenges hinder the efficient distribution of phages to patients in times of need.

By generating and maintaining an open public directory of researchers willing and able to test and mass-produce phages in response to a critically ill patient’s need, we can connect physicians, patients and families with potentially life-saving cures to otherwise untreatable drug-resistant infections.



## Running the Project

This site was created using [Middleman](http://middlemanapp.com) in a combination of ERB, Kramdown (variant of Markdown), and HTML, supported by SCSS.

To run this project locally, clone the project, install Middleman from the instructions on their site, then run:

~~~
bundle exec middleman server
~~~

then preview on `http://localhost:4567`


Compiling the example:

~~~
bundle exec middleman build
~~~

If you want to deploy Middleman as a straight-up site, you can do that for free on Github.

Deploying to Github uses [middleman deploy](https://github.com/middleman-contrib/middleman-deploy):

~~~
  bundle exec middleman build [--clean]
  bundle exec middleman deploy [--build-before]
~~~

`config.rb` file:
~~~
activate :deploy do |deploy|
  deploy.deploy_method = :git
  # Optional Settings
  # deploy.remote   = 'custom-remote' # remote name or git url, default: origin
  # deploy.branch   = 'custom-branch' # default: gh-pages
  # deploy.strategy = :submodule      # commit strategy: can be :force_push or :submodule, default: :force_push
  # deploy.commit_message = 'custom-message'      # commit message (can be empty), default: Automated commit at `timestamp` by middleman-deploy `version`
end
~~~
