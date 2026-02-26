import Map "mo:core/Map";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";

actor {
  type Medicine = {
    name : Text;
    dosageNotes : Text;
  };

  type Disease = {
    name : Text;
    description : Text;
    medicines : [Medicine];
  };

  let diseases = Map.empty<Text, Disease>();

  public shared ({ caller }) func initialize() : async () {
    if (diseases.isEmpty()) {
      let initialDiseases : [(Text, Disease)] = [
        (
          "Diabetes",
          {
            name = "Diabetes";
            description = "A chronic condition that affects how the body processes blood sugar (glucose). In diabetes, either the body doesn't produce enough insulin or it can't use insulin effectively, leading to high blood sugar levels.";
            medicines = [
              {
                name = "Metformin";
                dosageNotes = "Typically taken orally, starting dose is often 500 mg once or twice daily.";
              },
              {
                name = "Insulin";
                dosageNotes = "Dosing varies based on blood sugar levels and type of insulin used. Subcutaneous injection or insulin pump.";
              },
              {
                name = "Glipizide";
                dosageNotes = "Common starting dose is 5 mg orally once daily.";
              },
              {
                name = "Januvia (Sitagliptin)";
                dosageNotes = "Standard dose is 100 mg once daily.";
              },
              {
                name = "Invokana (Canagliflozin)";
                dosageNotes = "Usual starting dose is 100 mg orally once daily.";
              },
            ];
          },
        ),
        (
          "Hypertension (High Blood Pressure)",
          {
            name = "Hypertension (High Blood Pressure)";
            description = "A condition where the force of the blood against artery walls is consistently too high. Over time, high blood pressure can lead to health problems like heart disease.";
            medicines = [
              {
                name = "Lisinopril";
                dosageNotes = "Common starting dose is 10 mg orally once daily.";
              },
              {
                name = "Amlodipine";
                dosageNotes = "Typical starting dose is 5 mg orally once daily.";
              },
              {
                name = "Losartan";
                dosageNotes = "Usual starting dose is 50 mg orally once daily.";
              },
              {
                name = "Hydrochlorothiazide";
                dosageNotes = "Standard dose is 12.5 to 50 mg orally once daily.";
              },
              {
                name = "Metoprolol";
                dosageNotes = "Common dose range is 25-100 mg orally once daily.";
              },
            ];
          },
        ),
      ];
      for ((name, disease) in initialDiseases.values()) {
        diseases.add(name, disease);
      };
    };
  };

  public query ({ caller }) func getAllDiseases() : async [Disease] {
    diseases.values().toArray();
  };

  public query ({ caller }) func getDisease(name : Text) : async Disease {
    switch (diseases.get(name)) {
      case (null) { Runtime.trap("Disease not found") };
      case (?disease) { disease };
    };
  };
};
