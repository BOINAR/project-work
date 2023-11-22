export default function(professions = [], action) {
    if (action.type === 'initialiseProfessionInfo') {
        console.log("redux init", action.professionInfo);
       return action.professionInfo;
    } else if (action.type === "addNewSkill") {
        let professionsCopy = [...professions];
        professionsCopy.push(action.newSkill);
        return professionsCopy;
    } else if (action.type === "updateSkillExperience") {
        let professionsCopy = [...professions];
        console.log("redux", professionsCopy);
        let skillToUpdate = professionsCopy
            .find(job => job.job_title === action.job).skills
            .find(skill => skill.skill_title === action.skill);
        skillToUpdate.experience = action.experience;
        return professionsCopy;
    } else if (action.type === "updateSkillLevel") {
        let professionsCopy = [...professions];
        let skillToUpdate = professionsCopy
            .find(job => job.job_title === action.job).skills
            .find(skill => skill.skill_title === action.skill);
        skillToUpdate.level = action.level;
        return professionsCopy;
    } else {
        return professions;
    }
}