import { IIdea } from "../interface";

function cosineSimilarity(a: string[], b: string[]): number {
  const dotProduct = a.reduce(
    (acc, skill) => (b.includes(skill) ? acc + 1 : acc),
    0
  );
  const magnitudeA = Math.sqrt(a.length);
  const magnitudeB = Math.sqrt(b.length);
  return dotProduct / (magnitudeA * magnitudeB);
}

export function recommendProjects(
  userSkills: string[],
  projects: IIdea[]
): IIdea[] {
  let recommendations: IIdea[] = [];

  let sortedprojects: { project: IIdea; similarity: number }[] = [];
  for (let project of projects) {
    let projectskill: string[] = [];
    project.skills.map((skill) => {
      let sskill = skill.toLowerCase();
      projectskill.push(sskill);
    });

    const similarityScore = cosineSimilarity(userSkills, projectskill);

    if (similarityScore >= 0.1) {
      sortedprojects.push({ project: project, similarity: similarityScore });
    }

    sortedprojects.sort((a, b) => b.similarity - a.similarity);
  }
  for (let project of sortedprojects) {
    recommendations.push(project.project);
  }

  return recommendations;
}
