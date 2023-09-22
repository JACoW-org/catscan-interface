# CatScan 2.0 Interface

The CatScan tool is a promising invention. Generally the feedback has been good, but there are several areas it can be improved.

The flask app was a bit messy, and I need to move the interface to something that I can provide tooling to allow interactivity for updating latex files in-situ.

## Goals
1. Focus on cutting out the noise and outputting only the most relevant information to the end user.
2. Offload the heavy lifting to a function app to allow the app to scale under load during a conference.
3. Effectively parse LaTeX files
4. Allow suggestions for references
5. Allow in-context editing of latex files