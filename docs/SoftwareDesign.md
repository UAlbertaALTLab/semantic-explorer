# Software Design


## Architecture Diagram
This is a diagram of the client's full architecture. However, for this project creating the Vocabulary Explorer, we will only be interacting with the presentation and business layers.
![Architecture Diagram](assets/images/Software_Architecture_Diagram.png)


## UML Diagram
### UML Class Diagram
![Architecture Diagram](assets/images/UML_Diagram.png)
### UML Components Diagram
![UMLComponentDiagram](assets/images/Vocabulary Explorer UML Components Diagram.png)

## Low-fidelity User Interfaces and Storyboard Sequence 
![Architecture Diagram](assets/images/Vertical_Storyboard.png)


## Interaction Scenarios
![Interaction Scenarios](assets/images/Inter_1.png)

![Interaction Scenarios](assets/images/Inter_2.png)

![Interaction Scenarios](assets/images/Inter_3.png)

![Interaction Scenarios](assets/images/Inter_4.png)

![Interaction Scenarios](assets/images/Inter_5.png)

## API Endpoints
```
GET https://api.itwewina2.altlab.dev/api/search/
Query Parameters:
    - name (ex: atim)
    - rw_index (ex: 6.3.1.5.1)
    - rw_domain (ex: dog)

GET https://api.itwewina2.altlab.dev/api/rapidwords/ 
Query Parameters:
    - q (ex: 1.2.2)
```
Detailed endpoint documentation made by ALTLab can be found [here](https://github.com/UAlbertaALTLab/morphodict-backend).
