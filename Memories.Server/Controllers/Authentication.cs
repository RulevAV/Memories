using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Memories.Server.Controllers
{
    //[HttpPost]
    //public async Task<IActionResult> Post([FromBody] RegistrationViewModel model)
    //{
    //    if (!ModelState.IsValid)
    //    {
    //        return BadRequest(ModelState);
    //    }

    //    var userIdentity = _mapper.Map<AppUser>(model);
    //    var result = await _userManager.CreateAsync(userIdentity, model.Password);

    //    if (!result.Succeeded) return new BadRequestObjectResult(Errors.AddErrorsToModelState(result, ModelState));

    //    await _appDbContext.JobSeekers.AddAsync(new JobSeeker { IdentityId = userIdentity.Id, Location = model.Location });
    //    await _appDbContext.SaveChangesAsync();

    //    return new OkResult();
    //}
}
