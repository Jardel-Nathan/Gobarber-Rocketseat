import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';

import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let listProvidersDayAvailabilityService: ListProviderDayAvailabilityService;
let fakeAppointmentRepository: FakeAppointmentRepository;
describe('ListProviderDayAvailability', () => {

  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    listProvidersDayAvailabilityService = new ListProviderDayAvailabilityService(fakeAppointmentRepository);
  })

  it('should be able to list the month available from provider ', async () => {

    await fakeAppointmentRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

      jest.spyOn(Date, 'now').mockImplementationOnce(() => {
        return new Date(2020, 4, 20, 11).getTime();
      });

    const availability = await listProvidersDayAvailabilityService.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(availability).toEqual(expect.arrayContaining([
      { hour: 8, available: false },
      { hour: 9, available: false },
      { hour: 10, available: false },
      { hour: 11, available: false },
      { hour: 12, available: true },
      { hour: 13, available: true },
      { hour: 14, available: false },
      { hour: 15, available: false },
      { hour: 16, available: true },
    ]))



  })


})
